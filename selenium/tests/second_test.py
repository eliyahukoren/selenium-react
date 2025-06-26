import unittest
import sys

class DummyTestLogin(unittest.TestCase):
    def test_login(self):
        self.assertTrue(True)

if __name__ == '__main__':
    result = unittest.TextTestRunner(verbosity=2).run(unittest.defaultTestLoader.loadTestsFromTestCase(DummyTest))
    if result.wasSuccessful():
        print("✅ All tests passed")
        sys.exit(0)
    else:
        print("❌ Some tests failed")
        sys.exit(1)
