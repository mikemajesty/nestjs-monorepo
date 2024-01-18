import { EnhancerSubtype } from '@nestjs/common/constants';
export declare const MESSAGES: {
    APPLICATION_START: string;
    APPLICATION_READY: string;
    MICROSERVICE_READY: string;
    UNKNOWN_EXCEPTION_MESSAGE: string;
    ERROR_DURING_SHUTDOWN: string;
    CALL_LISTEN_FIRST: string;
};
export declare const APP_INTERCEPTOR = "APP_INTERCEPTOR";
export declare const APP_PIPE = "APP_PIPE";
export declare const APP_GUARD = "APP_GUARD";
export declare const APP_FILTER = "APP_FILTER";
export declare const ENHANCER_TOKEN_TO_SUBTYPE_MAP: Record<typeof APP_GUARD | typeof APP_PIPE | typeof APP_FILTER | typeof APP_INTERCEPTOR, EnhancerSubtype>;
