import unittest
import sys

class DummyTestDashboard(unittest.TestCase):
    def test_board(self):
        self.assertTrue(False)

if __name__ == '__main__':
    result = unittest.TextTestRunner(verbosity=2).run(unittest.defaultTestLoader.loadTestsFromTestCase(DummyTest))
    if result.wasSuccessful():
        print("✅ All tests passed")
        sys.exit(0)
    else:
        print("❌ Some tests failed")
        sys.exit(1)
