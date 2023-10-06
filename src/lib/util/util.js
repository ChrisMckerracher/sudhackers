async function sleep(ms) {
    await new Promise(res => setTimeout(res, ms));
}

export {sleep};