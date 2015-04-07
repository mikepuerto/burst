import assert from 'core/assert';
import * as dom from 'dom/events';


var specs = [];
var passed = 0;

var event = document.createEvent('HTMLEvents');
event.initEvent('custom', true, true);
event.eventName = 'custom';


function reset() {
    passed = 0;
    document.removeEventListener('custom', increment);
}


function increment () {
    passed += 1;
}


specs.push(function () {
    reset();

    dom.addListener(document, 'custom', increment);
    document.dispatchEvent(event);

    return assert(passed, 'should add a listener');
});


specs.push(function () {
    reset();

    document.addEventListener('custom', increment);
    dom.removeListener(document, 'custom', increment);
    document.dispatchEvent(event);

    return assert(!passed, 'should remove a listener');
});


specs.push(function () {
    reset();

    dom.domReady(increment)

    return assert(passed, 'should execute a callback on dom ready');
});


export default {name: 'DOM events', specs};