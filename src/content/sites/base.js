class BaseSite {
    check(url) {
        return false;
    }

    parse() {
        return new Promise();
    }
}

export default BaseSite;
