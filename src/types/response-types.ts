export type HealthCheckRes = {
    uptime: number,
    message: string,
    timestamp: number,
    responsetime: [number, number]
}