function addClass(el, className) {
    if (hasClass(className)) {
        return;
    }
    let newClass = className.split(" ");
    newClass.push(className);
    el.className = newClass.join(" ");
}

function hasClass(el, className) {
    let allClass;
    if (el.className) {
        allClass = el.className.split(" ");
        for (var i = 0, len = allClass.length; i < len; i++) {
            if (allClass[i] === className) {
                return true;
            }
        }
    }
    return false;
}

function attr(el, name, val) {
    let perfix = 'data-';
    name = perfix + name;
    if (val) {
        return el.setAttribute(name, val);
    } else {
        return el.getAttribute(name);
    }
}
export {
    hasClass,
    attr,
    addClass
}