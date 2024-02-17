export interface ILogModel{
    Id: string;
    Message: string | null;
    Level: string | null;
    Timestamp: string;
    Exception: string | null;
    LogEvent: string | null;
    TraceId: string | null;
    SpanId: string | null;
}