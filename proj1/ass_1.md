build a tiny app with register + login (jwt-protected) and behind that login, full create/read/update/delete on one entity - call it an "expense" with a name and an amount. data persists in sqlite. ugly is fine, ensure it works

1. build sqlite + one expense table - just get a row to persistr
2. crud routes with no auth yet
3. register + login that returns a JWt 
4. auth middleware - lock the crud routes behidn the token
5. bare-bones frontend that logs in stores token and calls the routes

