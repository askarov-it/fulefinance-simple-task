export type JwtPayload = {
  sub: string;
  iat?: number;
  exp?: number;
  jti?: string;
}
