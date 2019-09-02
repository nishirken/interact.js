import test from '@interactjs/_dev/test/test';
import * as helpers from '@interactjs/core/tests/_helpers';
import resize from './resize';
test('resize', t => {
    const rect = Object.freeze({ left: 0, top: 0, right: 10, bottom: 10, width: 10, height: 10 });
    const { scope, interactable, interaction, event, coords, target, } = helpers.testEnv({
        plugins: [resize],
        rect,
    });
    const element = target;
    t.ok(scope.actions.names.includes('resize'), '"resize" in actions.names');
    t.equal(scope.actions.methodDict.resize, 'resizable');
    t.equal(typeof scope.Interactable.prototype.resizable, 'function', 'Interactable.resizable method is added');
    interactable.resizable({
        edges: { left: true, top: true, right: true, bottom: true },
        // use margin greater than width and height
        margin: Infinity,
    });
    // resize top left
    interaction.updatePointer(event, event, element, true);
    t.deepEqual(resize.checker(event, event, interactable, element, interaction, rect), {
        name: 'resize',
        edges: { left: true, top: true, right: false, bottom: false },
    }, 'resize top left');
    // resize top right
    coords.page.x = 10;
    interaction.updatePointer(event, event, element, true);
    t.deepEqual(resize.checker(event, event, interactable, element, interaction, rect), {
        name: 'resize',
        edges: { left: false, top: true, right: true, bottom: false },
    }, 'resize top right');
    // resize bottom right
    coords.page.y = 10;
    interaction.updatePointer(event, event, element, true);
    t.deepEqual(resize.checker(event, event, interactable, element, interaction, rect), {
        name: 'resize',
        edges: { left: false, top: false, right: true, bottom: true },
    }, 'resize bottom right');
    const zeroRect = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
    coords.page.x = rect.right;
    coords.page.y = rect.bottom;
    interaction.updatePointer(event, event, element, true);
    interaction.start({ name: 'resize', edges: { bottom: true, right: true } }, interactable, element);
    t.deepEqual(interaction.resizeRects, {
        start: rect,
        current: helpers.getProps(rect, ['top', 'left', 'bottom', 'right']),
        inverted: rect,
        previous: rect,
        delta: zeroRect,
    }, 'sets starting interaction.resizeRect props');
    coords.page.x = -100;
    coords.page.y = -200;
    interaction.pointerMove(event, event, element);
    t.deepEqual(interaction.resizeRects, {
        start: rect,
        current: { left: 0, top: 0, right: -100, bottom: -200 },
        inverted: zeroRect,
        previous: rect,
        delta: { ...zeroRect, right: -rect.width, bottom: -rect.bottom, width: -rect.width, height: -rect.height },
    }, "invert: 'none'");
    interactable.options.resize.invert = 'reposition';
    interaction.move();
    t.deepEqual(interaction.resizeRects, {
        start: rect,
        current: { left: 0, top: 0, right: -100, bottom: -200 },
        inverted: { ...zeroRect, left: -100, top: -200, width: 100, height: 200 },
        previous: interaction.resizeRects.previous,
        delta: { ...zeroRect, left: -100, top: -200, width: 100, height: 200 },
    }, "invert: 'reposition'");
    interactable.options.resize.invert = 'none';
    interaction.move();
    interactable.options.resize.invert = 'negate';
    interaction.move();
    t.deepEqual(interaction.resizeRects, {
        start: rect,
        current: { left: 0, top: 0, right: -100, bottom: -200 },
        inverted: { ...zeroRect, right: -100, bottom: -200, width: -100, height: -200 },
        previous: interaction.resizeRects.previous,
        delta: { ...zeroRect, right: -100, bottom: -200, width: -100, height: -200 },
    }, "invert: 'negate'");
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNpemUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQTtBQUM3QyxPQUFPLEtBQUssT0FBTyxNQUFNLGlDQUFpQyxDQUFBO0FBQzFELE9BQU8sTUFBTSxNQUFNLFVBQVUsQ0FBQTtBQUU3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDN0YsTUFBTSxFQUNKLEtBQUssRUFDTCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxHQUNQLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNsQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDakIsSUFBSTtLQUNMLENBQUMsQ0FBQTtJQUVGLE1BQU0sT0FBTyxHQUFHLE1BQXFCLENBQUE7SUFFckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBZSxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQTtJQUNoRixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFBO0lBRTVHLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDckIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUMzRCwyQ0FBMkM7UUFDM0MsTUFBTSxFQUFFLFFBQVE7S0FDakIsQ0FBQyxDQUFBO0lBRUYsa0JBQWtCO0lBQ2xCLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFdEQsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQ3RFO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO0tBQzlELEVBQ0QsaUJBQWlCLENBQ2xCLENBQUE7SUFFRCxtQkFBbUI7SUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFdEQsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQ3RFO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO0tBQzlELEVBQ0Qsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxzQkFBc0I7SUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFdEQsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQ3RFO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0tBQzlELEVBQ0QscUJBQXFCLENBQ3RCLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUE7SUFFOUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQzNCLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdEQsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFbEcsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxXQUFXLENBQUMsV0FBVyxFQUN2QjtRQUNFLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxRQUFRO0tBQ2hCLEVBQ0QsNENBQTRDLENBQzdDLENBQUE7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUNwQixXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFOUMsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxXQUFXLENBQUMsV0FBVyxFQUN2QjtRQUNFLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7UUFDdkQsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0tBQzNHLEVBQ0QsZ0JBQWdCLENBQ2pCLENBQUE7SUFFRCxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFBO0lBQ2pELFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUVsQixDQUFDLENBQUMsU0FBUyxDQUNULFdBQVcsQ0FBQyxXQUFXLEVBQ3ZCO1FBQ0UsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtRQUN2RCxRQUFRLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtRQUN6RSxRQUFRLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRO1FBQzFDLEtBQUssRUFBRSxFQUFFLEdBQUcsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0tBQ3ZFLEVBQ0Qsc0JBQXNCLENBQ3ZCLENBQUE7SUFFRCxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQzNDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFBO0lBQzdDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUVsQixDQUFDLENBQUMsU0FBUyxDQUNULFdBQVcsQ0FBQyxXQUFXLEVBQ3ZCO1FBQ0UsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtRQUN2RCxRQUFRLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7UUFDL0UsUUFBUSxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUTtRQUMxQyxLQUFLLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7S0FDN0UsRUFDRCxrQkFBa0IsQ0FDbkIsQ0FBQTtJQUVELENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUNULENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlc3QgZnJvbSAnQGludGVyYWN0anMvX2Rldi90ZXN0L3Rlc3QnXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJ0BpbnRlcmFjdGpzL2NvcmUvdGVzdHMvX2hlbHBlcnMnXG5pbXBvcnQgcmVzaXplIGZyb20gJy4vcmVzaXplJ1xuXG50ZXN0KCdyZXNpemUnLCB0ID0+IHtcbiAgY29uc3QgcmVjdCA9IE9iamVjdC5mcmVlemUoeyBsZWZ0OiAwLCB0b3A6IDAsIHJpZ2h0OiAxMCwgYm90dG9tOiAxMCwgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwIH0pXG4gIGNvbnN0IHtcbiAgICBzY29wZSxcbiAgICBpbnRlcmFjdGFibGUsXG4gICAgaW50ZXJhY3Rpb24sXG4gICAgZXZlbnQsXG4gICAgY29vcmRzLFxuICAgIHRhcmdldCxcbiAgfSA9IGhlbHBlcnMudGVzdEVudih7XG4gICAgcGx1Z2luczogW3Jlc2l6ZV0sXG4gICAgcmVjdCxcbiAgfSlcblxuICBjb25zdCBlbGVtZW50ID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50XG5cbiAgdC5vayhzY29wZS5hY3Rpb25zLm5hbWVzLmluY2x1ZGVzKCdyZXNpemUnIGFzIGFueSksICdcInJlc2l6ZVwiIGluIGFjdGlvbnMubmFtZXMnKVxuICB0LmVxdWFsKHNjb3BlLmFjdGlvbnMubWV0aG9kRGljdC5yZXNpemUsICdyZXNpemFibGUnKVxuICB0LmVxdWFsKHR5cGVvZiBzY29wZS5JbnRlcmFjdGFibGUucHJvdG90eXBlLnJlc2l6YWJsZSwgJ2Z1bmN0aW9uJywgJ0ludGVyYWN0YWJsZS5yZXNpemFibGUgbWV0aG9kIGlzIGFkZGVkJylcblxuICBpbnRlcmFjdGFibGUucmVzaXphYmxlKHtcbiAgICBlZGdlczogeyBsZWZ0OiB0cnVlLCB0b3A6IHRydWUsIHJpZ2h0OiB0cnVlLCBib3R0b206IHRydWUgfSxcbiAgICAvLyB1c2UgbWFyZ2luIGdyZWF0ZXIgdGhhbiB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgbWFyZ2luOiBJbmZpbml0eSxcbiAgfSlcblxuICAvLyByZXNpemUgdG9wIGxlZnRcbiAgaW50ZXJhY3Rpb24udXBkYXRlUG9pbnRlcihldmVudCwgZXZlbnQsIGVsZW1lbnQsIHRydWUpXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgcmVzaXplLmNoZWNrZXIoZXZlbnQsIGV2ZW50LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uLCByZWN0KSxcbiAgICB7XG4gICAgICBuYW1lOiAncmVzaXplJyxcbiAgICAgIGVkZ2VzOiB7IGxlZnQ6IHRydWUsIHRvcDogdHJ1ZSwgcmlnaHQ6IGZhbHNlLCBib3R0b206IGZhbHNlIH0sXG4gICAgfSxcbiAgICAncmVzaXplIHRvcCBsZWZ0JyxcbiAgKVxuXG4gIC8vIHJlc2l6ZSB0b3AgcmlnaHRcbiAgY29vcmRzLnBhZ2UueCA9IDEwXG4gIGludGVyYWN0aW9uLnVwZGF0ZVBvaW50ZXIoZXZlbnQsIGV2ZW50LCBlbGVtZW50LCB0cnVlKVxuXG4gIHQuZGVlcEVxdWFsKFxuICAgIHJlc2l6ZS5jaGVja2VyKGV2ZW50LCBldmVudCwgaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBpbnRlcmFjdGlvbiwgcmVjdCksXG4gICAge1xuICAgICAgbmFtZTogJ3Jlc2l6ZScsXG4gICAgICBlZGdlczogeyBsZWZ0OiBmYWxzZSwgdG9wOiB0cnVlLCByaWdodDogdHJ1ZSwgYm90dG9tOiBmYWxzZSB9LFxuICAgIH0sXG4gICAgJ3Jlc2l6ZSB0b3AgcmlnaHQnLFxuICApXG5cbiAgLy8gcmVzaXplIGJvdHRvbSByaWdodFxuICBjb29yZHMucGFnZS55ID0gMTBcbiAgaW50ZXJhY3Rpb24udXBkYXRlUG9pbnRlcihldmVudCwgZXZlbnQsIGVsZW1lbnQsIHRydWUpXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgcmVzaXplLmNoZWNrZXIoZXZlbnQsIGV2ZW50LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGludGVyYWN0aW9uLCByZWN0KSxcbiAgICB7XG4gICAgICBuYW1lOiAncmVzaXplJyxcbiAgICAgIGVkZ2VzOiB7IGxlZnQ6IGZhbHNlLCB0b3A6IGZhbHNlLCByaWdodDogdHJ1ZSwgYm90dG9tOiB0cnVlIH0sXG4gICAgfSxcbiAgICAncmVzaXplIGJvdHRvbSByaWdodCcsXG4gIClcblxuICBjb25zdCB6ZXJvUmVjdCA9IHsgbGVmdDogMCwgdG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH1cblxuICBjb29yZHMucGFnZS54ID0gcmVjdC5yaWdodFxuICBjb29yZHMucGFnZS55ID0gcmVjdC5ib3R0b21cbiAgaW50ZXJhY3Rpb24udXBkYXRlUG9pbnRlcihldmVudCwgZXZlbnQsIGVsZW1lbnQsIHRydWUpXG4gIGludGVyYWN0aW9uLnN0YXJ0KHsgbmFtZTogJ3Jlc2l6ZScsIGVkZ2VzOiB7IGJvdHRvbTogdHJ1ZSwgcmlnaHQ6IHRydWUgfSB9LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMsXG4gICAge1xuICAgICAgc3RhcnQ6IHJlY3QsXG4gICAgICBjdXJyZW50OiBoZWxwZXJzLmdldFByb3BzKHJlY3QsIFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J10pLFxuICAgICAgaW52ZXJ0ZWQ6IHJlY3QsXG4gICAgICBwcmV2aW91czogcmVjdCxcbiAgICAgIGRlbHRhOiB6ZXJvUmVjdCxcbiAgICB9LFxuICAgICdzZXRzIHN0YXJ0aW5nIGludGVyYWN0aW9uLnJlc2l6ZVJlY3QgcHJvcHMnLFxuICApXG5cbiAgY29vcmRzLnBhZ2UueCA9IC0xMDBcbiAgY29vcmRzLnBhZ2UueSA9IC0yMDBcbiAgaW50ZXJhY3Rpb24ucG9pbnRlck1vdmUoZXZlbnQsIGV2ZW50LCBlbGVtZW50KVxuXG4gIHQuZGVlcEVxdWFsKFxuICAgIGludGVyYWN0aW9uLnJlc2l6ZVJlY3RzLFxuICAgIHtcbiAgICAgIHN0YXJ0OiByZWN0LFxuICAgICAgY3VycmVudDogeyBsZWZ0OiAwLCB0b3A6IDAsIHJpZ2h0OiAtMTAwLCBib3R0b206IC0yMDAgfSxcbiAgICAgIGludmVydGVkOiB6ZXJvUmVjdCxcbiAgICAgIHByZXZpb3VzOiByZWN0LFxuICAgICAgZGVsdGE6IHsgLi4uemVyb1JlY3QsIHJpZ2h0OiAtcmVjdC53aWR0aCwgYm90dG9tOiAtcmVjdC5ib3R0b20sIHdpZHRoOiAtcmVjdC53aWR0aCwgaGVpZ2h0OiAtcmVjdC5oZWlnaHQgfSxcbiAgICB9LFxuICAgIFwiaW52ZXJ0OiAnbm9uZSdcIixcbiAgKVxuXG4gIGludGVyYWN0YWJsZS5vcHRpb25zLnJlc2l6ZS5pbnZlcnQgPSAncmVwb3NpdGlvbidcbiAgaW50ZXJhY3Rpb24ubW92ZSgpXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMsXG4gICAge1xuICAgICAgc3RhcnQ6IHJlY3QsXG4gICAgICBjdXJyZW50OiB7IGxlZnQ6IDAsIHRvcDogMCwgcmlnaHQ6IC0xMDAsIGJvdHRvbTogLTIwMCB9LFxuICAgICAgaW52ZXJ0ZWQ6IHsgLi4uemVyb1JlY3QsIGxlZnQ6IC0xMDAsIHRvcDogLTIwMCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMDAgfSxcbiAgICAgIHByZXZpb3VzOiBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5wcmV2aW91cywgLy8gbm90IHRlc3RpbmcgcHJldmlvdXNcbiAgICAgIGRlbHRhOiB7IC4uLnplcm9SZWN0LCBsZWZ0OiAtMTAwLCB0b3A6IC0yMDAsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAwIH0sXG4gICAgfSxcbiAgICBcImludmVydDogJ3JlcG9zaXRpb24nXCIsXG4gIClcblxuICBpbnRlcmFjdGFibGUub3B0aW9ucy5yZXNpemUuaW52ZXJ0ID0gJ25vbmUnXG4gIGludGVyYWN0aW9uLm1vdmUoKVxuICBpbnRlcmFjdGFibGUub3B0aW9ucy5yZXNpemUuaW52ZXJ0ID0gJ25lZ2F0ZSdcbiAgaW50ZXJhY3Rpb24ubW92ZSgpXG5cbiAgdC5kZWVwRXF1YWwoXG4gICAgaW50ZXJhY3Rpb24ucmVzaXplUmVjdHMsXG4gICAge1xuICAgICAgc3RhcnQ6IHJlY3QsXG4gICAgICBjdXJyZW50OiB7IGxlZnQ6IDAsIHRvcDogMCwgcmlnaHQ6IC0xMDAsIGJvdHRvbTogLTIwMCB9LFxuICAgICAgaW52ZXJ0ZWQ6IHsgLi4uemVyb1JlY3QsIHJpZ2h0OiAtMTAwLCBib3R0b206IC0yMDAsIHdpZHRoOiAtMTAwLCBoZWlnaHQ6IC0yMDAgfSxcbiAgICAgIHByZXZpb3VzOiBpbnRlcmFjdGlvbi5yZXNpemVSZWN0cy5wcmV2aW91cywgLy8gbm90IHRlc3RpbmcgcHJldmlvdXNcbiAgICAgIGRlbHRhOiB7IC4uLnplcm9SZWN0LCByaWdodDogLTEwMCwgYm90dG9tOiAtMjAwLCB3aWR0aDogLTEwMCwgaGVpZ2h0OiAtMjAwIH0sXG4gICAgfSxcbiAgICBcImludmVydDogJ25lZ2F0ZSdcIixcbiAgKVxuXG4gIHQuZW5kKClcbn0pXG4iXX0=