

# Model Playground

## Development

This section guides you through setting up your development environment for the Model Playground. Follow these instructions to start building and testing the project.

### Development Server

1. **Start the Server**:
   Launch the development server by running:
   ```bash
   yarn start
   ```
   This command serves your app at `http://localhost:4200/` and automatically reloads the app when any source file is changed.

### Build

To build the project, use the following command:
```bash
yarn build
```
This will compile the Angular application and store the build artifacts in the `dist/` directory. Use this command for generating production-ready files.

### Test

To execute tests, run:
```bash
yarn test
```
This command will initiate the test runner in the interactive watch mode. Ensure your tests cover enough cases to verify the functionalities of your models.

### Additional Commands

- **Linting**: Ensure your code follows best practices and adheres to the project's coding standards.
  ```bash
  yarn lint
  ```
- **E2E Testing**: For end-to-end testing, particularly useful in testing complete flows and interactions:
  ```bash
  yarn e2e
  ```

