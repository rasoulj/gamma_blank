const VIDEO_EXT = ['mp4', 'mov']

export function isVideo(uri?: string): boolean {
    if ((uri ?? '').trim() === '') return false;
    const tt = uri.split('.');
    if (tt.length < 2) return false;
    const ext = tt[tt.length - 1].toLowerCase()
    return VIDEO_EXT.includes(ext)
}