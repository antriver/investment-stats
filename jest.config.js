module.exports = {
    moduleFileExtensions: [
        'ts',
        'js',
    ],

    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    // A list of directories that Jest should search for test files in.
    roots: [
        '<rootDir>/src/',
        '<rootDir>/tests/',
    ],

    // The glob patterns Jest uses to detect test files.
    testMatch: [
        '**/*.spec.ts',
    ],

    testPathIgnorePatterns: [
        '/node_modules/',
    ],

    // Run with coverage disabled by default. You can run `jest --coverage` to enable.
    collectCoverage: false,

    // Export coverage results to this directory.
    // coverageDirectory: '<rootDir>/test-reports/ui/coverage',

    // Collect coverage for all these files, even if they are not included by any tests.
    // Note that these must be within one of the 'roots' above.
    // Collect coverage for all these files, even if they are not included by any tests.
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,ts}',
    ],
};
