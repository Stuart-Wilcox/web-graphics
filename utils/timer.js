let prev = Date.now();
const log = (name) => {
    const now = Date.now();
    const diff = now - prev;
    console.log(`[${diff}] ${name}`);
    prev = now;
};