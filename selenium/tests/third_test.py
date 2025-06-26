import unittest
import sys

class DummyTestFail(unittest.TestCase):
    def test_fail(self):
        self.assertTrue(False)

if __name__ == '__main__':
    result = unittest.TextTestRunner(verbosity=2).run(unittest.defaultTestLoader.loadTestsFromTestCase(DummyTest))
    if result.wasSuccessful():
        print("✅ All tests passed")
        sys.exit(0)
    else:
        print("❌ Some tests failed")
        sys.exit(1)
