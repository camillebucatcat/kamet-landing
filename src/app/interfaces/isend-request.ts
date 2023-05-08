export interface ISendRequest {
    serial: 'urlencoded' | 'utf8' | 'multipart' | 'raw' | 'json';
    serializer?: 'post' | 'put ' | 'patch';
    url?: string;
    base_url?: 'base_url' | 'pentest_url' | 'dmm_url';
    params?: any;
    data?: any;
    headers?: any;
    responseType?: 'text' | 'json' | 'arraybuffer' | 'blob';
    timeout?: number;
    followRedirect?: 'enable' | 'disable';
    filePath?: string;
    name?: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'options' | 'upload' | 'download';
    requestype?: 'v1' | 'v2' | 'v3';
    v2data?: any;
    v3data?:any;
}