import unittest
import xmlrunner

if __name__ == '__main__':
    output_dir = "/workspace/selenium-poc/selenium-poc/reports"
    loader = unittest.TestLoader()
    suite = loader.discover(start_dir='tests', pattern='*_test.py')

    runner = xmlrunner.XMLTestRunner(output=output_dir, verbosity=2)
    result = runner.run(suite)

    if not result.wasSuccessful():
        exit(1)
