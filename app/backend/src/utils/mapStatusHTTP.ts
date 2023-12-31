export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'UPDATE': return 201;
    case 'NOT_FOUND': return 404;
    default: return 401;
  }
}
