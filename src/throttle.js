export default (callback, delay = 300, noTrailing, debounceMode) => {
    let timeoutID;
    let lastExec = 0;

    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    function wrapper(...args) {
        const self = this;
        const elapsed = Number(new Date()) - lastExec;

        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        function clear() {
            timeoutID = undefined;
        }

        if (debounceMode && !timeoutID) {
            exec();
        }

        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        if (debounceMode === undefined && elapsed > delay) {
            exec();
        } else if (noTrailing !== true) {
            timeoutID = setTimeout(
                debounceMode ? clear : exec,
                debounceMode === undefined ? delay - elapsed : delay
            );
        }
    }

    return wrapper;
};
