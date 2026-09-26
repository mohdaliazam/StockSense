# Project Rules for AI Agents (Harness)

1. **Use TypeScript**: All new code in both frontend and backend must be written in TypeScript.
2. **Database Schema Modifications**: Do not modify the Prisma schema (`schema.prisma`) without explicit approval.
3. **Tests Required**: Every new API endpoint and critical business logic module requires unit/integration tests.
4. **Verification**: Run tests and linting before declaring a task complete.
5. **No Secrets in Code**: Never commit secrets, API keys, or hardcoded passwords. Use environment variables.
6. **Separation of Concerns**: Keep database interaction logic inside the `services/` layer, not in `controllers/` or `routes/`.
7. **Definition of Done**: Always check `DEFINITION_OF_DONE.md` to ensure a feature is actually complete.
8. **Documentation**: Update markdown documents when business logic or architecture changes.
