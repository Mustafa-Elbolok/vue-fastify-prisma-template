export default function(path: string){
    switch(path.split(".").at(-1)){
        case 'js': return 'application/javascript';
        case 'css': return 'text/css';
        case 'png': return 'image/png';
        case 'jpeg': return 'image/jpeg';
        case 'svg': return 'image/svg+xml';
        default: return 'text/plain';
    }
}
