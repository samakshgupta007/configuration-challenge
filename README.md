# Configuration Challenge

### Prerequisites

To package and run this application, you'll need to:

- Clone this repository:

      $ git clone https://github.com/samakshgupta007/configuration-challenge.git
      $ cd configuration-challenge

### Installation

```bash
$ npm install
```

### Using the Library

Import the 'fetchConfigurations' function from the srx/index.js file. This function can be called with an array of file names on disk. For reference, a few example files have been included in the repository - also to help with testing.

The 'fetchConfigurations' can be called with an array of any files on disk and return a JSON with the configuration details - with the latest files overriding the previous ones, if need be. For the returned object, it is possible to retrieve parts of the configuration by a dot-separated path; this works for both sections and for individual keys, no matter how deeply nested.

### Test

```bash
# unit tests
$ npm run test

```
