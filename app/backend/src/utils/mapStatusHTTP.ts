export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'UPDATE': return 201;
    case 'UNAUTHORIZED': return 401;
    default: return 500;
  }
}
