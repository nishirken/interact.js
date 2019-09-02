/* eslint-disable no-restricted-syntax */
import { doc } from '@interactjs/_dev/test/domator';
import * as utils from '@interactjs/utils';
import Signals from '@interactjs/utils/Signals';
import Eventable from '../Eventable';
import { createScope } from '../scope';
let counter = 0;
export function unique() {
    return (counter++);
}
export function uniqueProps(obj) {
    for (const prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
            continue;
        }
        if (utils.is.object(obj)) {
            uniqueProps(obj[prop]);
        }
        else {
            obj[prop] = (counter++);
        }
    }
}
export function newCoordsSet(n = 0) {
    return {
        start: {
            page: { x: n++, y: n++ },
            client: { x: n++, y: n++ },
            timeStamp: n++,
        },
        cur: {
            page: { x: n++, y: n++ },
            client: { x: n++, y: n++ },
            timeStamp: n++,
        },
        prev: {
            page: { x: n++, y: n++ },
            client: { x: n++, y: n++ },
            timeStamp: n++,
        },
        delta: {
            page: { x: n++, y: n++ },
            client: { x: n++, y: n++ },
            timeStamp: n++,
        },
        velocity: {
            page: { x: n++, y: n++ },
            client: { x: n++, y: n++ },
            timeStamp: n++,
        },
    };
}
export function newPointer(n = 50) {
    return {
        pointerId: n++,
        pageX: n++,
        pageY: n++,
        clientX: n++,
        clientY: n++,
    };
}
export function mockScope(options = {}) {
    const document = options.document || doc;
    const window = document.defaultView;
    const scope = createScope().init(window);
    scope.interact = Object.assign(() => { }, { use() { } });
    return scope;
}
export function mockSignals() {
    return {
        on() { },
        off() { },
        fire() { },
    };
}
export function mockInteractable(props = {}) {
    return Object.assign({
        _signals: new Signals(),
        _actions: {
            names: [],
            methodDict: {},
        },
        options: {
            deltaSource: 'page',
        },
        target: {},
        events: new Eventable(),
        getRect() {
            return this.element
                ? utils.dom.getElementClientRect(this.element)
                : { left: 0, top: 0, right: 0, bottom: 0 };
        },
        fire(event) {
            this.events.fire(event);
        },
    }, props);
}
export function getProps(src, props) {
    return props.reduce((acc, prop) => {
        if (prop in src) {
            acc[prop] = src[prop];
        }
        return acc;
    }, {});
}
export function testEnv({ plugins = [], target, rect = { top: 0, left: 0, bottom: 0, right: 0 }, } = {}) {
    const scope = mockScope();
    for (const plugin of plugins) {
        scope.usePlugin(plugin);
    }
    if (!target) {
        target = scope.document.body;
    }
    const interaction = scope.interactions.new({});
    const interactable = scope.interactables.new(target);
    const coords = utils.pointer.newCoords();
    coords.target = target;
    const event = utils.pointer.coordsToEvent(coords);
    interactable.rectChecker(() => ({ ...rect }));
    return {
        scope,
        interaction,
        target,
        interactable,
        coords,
        event,
    };
}
export function timeout(n) {
    return new Promise(resolve => setTimeout(resolve, n));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2hlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5Q0FBeUM7QUFDekMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLCtCQUErQixDQUFBO0FBQ25ELE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUE7QUFFMUMsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUE7QUFDL0MsT0FBTyxTQUFTLE1BQU0sY0FBYyxDQUFBO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0FBRWYsTUFBTSxVQUFVLE1BQU07SUFDcEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFDcEIsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUUsR0FBRztJQUM5QixLQUFLLE1BQU0sSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLFNBQVE7U0FBRTtRQUUzQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUN2QjthQUNJO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtTQUN4QjtLQUNGO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUUsQ0FBQyxHQUFHLENBQUM7SUFDakMsT0FBTztRQUNMLEtBQUssRUFBRTtZQUNMLElBQUksRUFBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxFQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENB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QyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzlDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFnQixDQUFBO0lBRXRELE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3RCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRWpELFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRTdDLE9BQU87UUFDTCxLQUFLO1FBQ0wsV0FBVztRQUNYLE1BQU07UUFDTixZQUFZO1FBQ1osTUFBTTtRQUNOLEtBQUs7S0FDTixDQUFBO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUUsQ0FBQztJQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3ZELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IHsgZG9jIH0gZnJvbSAnQGludGVyYWN0anMvX2Rldi90ZXN0L2RvbWF0b3InXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscydcbmltcG9ydCB7IE1vY2tDb29yZHMgfSBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9wb2ludGVyVXRpbHMnXG5pbXBvcnQgU2lnbmFscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9TaWduYWxzJ1xuaW1wb3J0IEV2ZW50YWJsZSBmcm9tICcuLi9FdmVudGFibGUnXG5pbXBvcnQgeyBjcmVhdGVTY29wZSB9IGZyb20gJy4uL3Njb3BlJ1xuXG5sZXQgY291bnRlciA9IDBcblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZSAoKSB7XG4gIHJldHVybiAoY291bnRlcisrKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlUHJvcHMgKG9iaikge1xuICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHsgY29udGludWUgfVxuXG4gICAgaWYgKHV0aWxzLmlzLm9iamVjdChvYmopKSB7XG4gICAgICB1bmlxdWVQcm9wcyhvYmpbcHJvcF0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgb2JqW3Byb3BdID0gKGNvdW50ZXIrKylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0Nvb3Jkc1NldCAobiA9IDApIHtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDoge1xuICAgICAgcGFnZSAgICAgOiB7IHg6IG4rKywgeTogbisrIH0sXG4gICAgICBjbGllbnQgICA6IHsgeDogbisrLCB5OiBuKysgfSxcbiAgICAgIHRpbWVTdGFtcDogbisrLFxuICAgIH0sXG4gICAgY3VyOiB7XG4gICAgICBwYWdlICAgICA6IHsgeDogbisrLCB5OiBuKysgfSxcbiAgICAgIGNsaWVudCAgIDogeyB4OiBuKyssIHk6IG4rKyB9LFxuICAgICAgdGltZVN0YW1wOiBuKyssXG4gICAgfSxcbiAgICBwcmV2OiB7XG4gICAgICBwYWdlICAgICA6IHsgeDogbisrLCB5OiBuKysgfSxcbiAgICAgIGNsaWVudCAgIDogeyB4OiBuKyssIHk6IG4rKyB9LFxuICAgICAgdGltZVN0YW1wOiBuKyssXG4gICAgfSxcbiAgICBkZWx0YToge1xuICAgICAgcGFnZSAgICAgOiB7IHg6IG4rKywgeTogbisrIH0sXG4gICAgICBjbGllbnQgICA6IHsgeDogbisrLCB5OiBuKysgfSxcbiAgICAgIHRpbWVTdGFtcDogbisrLFxuICAgIH0sXG4gICAgdmVsb2NpdHk6IHtcbiAgICAgIHBhZ2UgICAgIDogeyB4OiBuKyssIHk6IG4rKyB9LFxuICAgICAgY2xpZW50ICAgOiB7IHg6IG4rKywgeTogbisrIH0sXG4gICAgICB0aW1lU3RhbXA6IG4rKyxcbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQb2ludGVyIChuID0gNTApIHtcbiAgcmV0dXJuIHtcbiAgICBwb2ludGVySWQ6IG4rKyxcbiAgICBwYWdlWDogbisrLFxuICAgIHBhZ2VZOiBuKyssXG4gICAgY2xpZW50WDogbisrLFxuICAgIGNsaWVudFk6IG4rKyxcbiAgfSBhcyBJbnRlcmFjdC5Qb2ludGVyVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9ja1Njb3BlIChvcHRpb25zID0ge30gYXMgYW55KSB7XG4gIGNvbnN0IGRvY3VtZW50ID0gb3B0aW9ucy5kb2N1bWVudCB8fCBkb2NcbiAgY29uc3Qgd2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXdcblxuICBjb25zdCBzY29wZTogYW55ID0gY3JlYXRlU2NvcGUoKS5pbml0KHdpbmRvdylcblxuICBzY29wZS5pbnRlcmFjdCA9IE9iamVjdC5hc3NpZ24oKCkgPT4ge30sIHsgdXNlICgpIHt9IH0pIGFzIGFueVxuXG4gIHJldHVybiBzY29wZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9ja1NpZ25hbHMgKCkge1xuICByZXR1cm4ge1xuICAgIG9uICgpIHt9LFxuICAgIG9mZiAoKSB7fSxcbiAgICBmaXJlICgpIHt9LFxuICB9IGFzIHVua25vd24gYXMgYW55XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2NrSW50ZXJhY3RhYmxlIChwcm9wcyA9IHt9KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIHtcbiAgICAgIF9zaWduYWxzOiBuZXcgU2lnbmFscygpLFxuICAgICAgX2FjdGlvbnM6IHtcbiAgICAgICAgbmFtZXM6IFtdLFxuICAgICAgICBtZXRob2REaWN0OiB7fSxcbiAgICAgIH0sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGRlbHRhU291cmNlOiAncGFnZScsXG4gICAgICB9LFxuICAgICAgdGFyZ2V0OiB7fSxcbiAgICAgIGV2ZW50czogbmV3IEV2ZW50YWJsZSgpLFxuICAgICAgZ2V0UmVjdCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRcbiAgICAgICAgICA/IHV0aWxzLmRvbS5nZXRFbGVtZW50Q2xpZW50UmVjdCh0aGlzLmVsZW1lbnQpXG4gICAgICAgICAgOiB7IGxlZnQ6IDAsIHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCB9XG4gICAgICB9LFxuICAgICAgZmlyZSAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMuZmlyZShldmVudClcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwcm9wcykgYXMgYW55XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wczxUIGV4dGVuZHMge30sIEsgZXh0ZW5kcyBrZXlvZiBUPiAoc3JjOiBULCBwcm9wczogS1tdKSB7XG4gIHJldHVybiBwcm9wcy5yZWR1Y2UoKGFjYywgcHJvcCkgPT4ge1xuICAgIGlmIChwcm9wIGluIHNyYykge1xuICAgICAgYWNjW3Byb3BdID0gc3JjW3Byb3BdXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSBhcyBQaWNrPFQsIEs+KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdEVudjxUIGV4dGVuZHMgSW50ZXJhY3QuVGFyZ2V0ID0gSFRNTEVsZW1lbnQ+ICh7XG4gIHBsdWdpbnMgPSBbXSxcbiAgdGFyZ2V0LFxuICByZWN0ID0geyAgdG9wOiAwLCBsZWZ0OiAwLCBib3R0b206IDAsIHJpZ2h0OiAwICB9LFxufToge1xuICBwbHVnaW5zPzogSW50ZXJhY3QuUGx1Z2luW11cbiAgdGFyZ2V0PzogVFxuICByZWN0PzogSW50ZXJhY3QuUmVjdFxufSA9IHt9KSB7XG4gIGNvbnN0IHNjb3BlOiBJbnRlcmFjdC5TY29wZSA9IG1vY2tTY29wZSgpXG5cbiAgZm9yIChjb25zdCBwbHVnaW4gb2YgcGx1Z2lucykge1xuICAgIHNjb3BlLnVzZVBsdWdpbihwbHVnaW4pXG4gIH1cblxuICBpZiAoIXRhcmdldCkge1xuICAgICh0YXJnZXQgYXMgdW5rbm93biBhcyBIVE1MRWxlbWVudCkgPSBzY29wZS5kb2N1bWVudC5ib2R5XG4gIH1cblxuICBjb25zdCBpbnRlcmFjdGlvbiA9IHNjb3BlLmludGVyYWN0aW9ucy5uZXcoe30pXG4gIGNvbnN0IGludGVyYWN0YWJsZSA9IHNjb3BlLmludGVyYWN0YWJsZXMubmV3KHRhcmdldClcbiAgY29uc3QgY29vcmRzID0gdXRpbHMucG9pbnRlci5uZXdDb29yZHMoKSBhcyBNb2NrQ29vcmRzXG5cbiAgY29vcmRzLnRhcmdldCA9IHRhcmdldFxuICBjb25zdCBldmVudCA9IHV0aWxzLnBvaW50ZXIuY29vcmRzVG9FdmVudChjb29yZHMpXG5cbiAgaW50ZXJhY3RhYmxlLnJlY3RDaGVja2VyKCgpID0+ICh7IC4uLnJlY3QgfSkpXG5cbiAgcmV0dXJuIHtcbiAgICBzY29wZSxcbiAgICBpbnRlcmFjdGlvbixcbiAgICB0YXJnZXQsXG4gICAgaW50ZXJhY3RhYmxlLFxuICAgIGNvb3JkcyxcbiAgICBldmVudCxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZW91dCAobikge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG4pKVxufVxuIl19