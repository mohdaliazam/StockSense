# Definition of Done (DoD)

A feature or task is considered complete only when all the following criteria are met:

- [ ] **Implementation**: Code fulfills all requirements specified in the problem statement.
- [ ] **TypeScript Check**: Code compiles with zero TypeScript errors.
- [ ] **Linting**: Code passes ESLint / Prettier rules.
- [ ] **Testing**: 
  - Unit tests are written for new business logic.
  - Integration tests are written for new API endpoints.
  - Tests pass successfully.
- [ ] **Error Handling**: Graceful error handling is implemented (e.g., standard HTTP error codes, no app crashes).
- [ ] **Security**: 
  - Authentication (JWT) is enforced on protected routes.
  - Role-based authorization is enforced where applicable.
- [ ] **Documentation**: `README.md`, `ARCHITECTURE.md`, or `DATABASE_SCHEMA.md` are updated if the system design has changed.
- [ ] **Regression**: No existing tests are broken.
