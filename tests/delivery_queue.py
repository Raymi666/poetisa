"""SQLite reservation invariants, using the actual generated schema and route SQL."""
import concurrent.futures, pathlib, re, sqlite3, tempfile, unittest
from contextlib import closing
ROOT=pathlib.Path(__file__).resolve().parents[1]
ROUTE=(ROOT/'app/mcp/route.ts').read_text()
INSERT=re.search(r'prepare\("(INSERT OR IGNORE INTO poetisa_deliveries[^"\n]+)"\)',ROUTE).group(1)
FINISH=re.search(r'prepare\("(UPDATE poetisa_deliveries SET status[^"\n]+)"\)',ROUTE).group(1)
class Queue(unittest.TestCase):
 def test_simultaneous_claim_and_terminal_result(self):
  with tempfile.TemporaryDirectory() as folder:
   path=str(pathlib.Path(folder)/'queue.db')
   with closing(sqlite3.connect(path)) as db, db:
    for file in sorted((ROOT/'drizzle').glob('*.sql')):db.executescript(file.read_text())
   def reserve(_):
    with closing(sqlite3.connect(path,timeout=10)) as db, db:
     return db.execute(INSERT,('subscription:2026-10-31','subscription','2026-10-31',1)).rowcount
   with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    self.assertEqual(sum(executor.map(reserve,range(20))),1)
   with closing(sqlite3.connect(path)) as db, db:
    self.assertEqual(db.execute(FINISH,('uncertain',2,'subscription:2026-10-31')).rowcount,1)
    self.assertEqual(db.execute(FINISH,('sent',3,'subscription:2026-10-31')).rowcount,0)
   self.assertEqual(reserve(0),0)
if __name__=='__main__':unittest.main()
