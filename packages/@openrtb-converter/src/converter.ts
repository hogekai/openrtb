export interface Converter<FROM, TO> {
  to(from: FROM): TO;
  from(to: TO): FROM;
}
