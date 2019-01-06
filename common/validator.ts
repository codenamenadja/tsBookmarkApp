const isURL = (url: string) => {
    return /^(http|https):\/\/[^ ""]+&/.test(url);
}
export { isURL };