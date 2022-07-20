# Spinner-Wheel
Spinner Wheel Web-Application Using Vanilla JS (Where it will show the Offer Reward.

### Finding the rewarded Offer:

Here is the, My Approach to finding the reward offer after spinning the wheel looks like this:

Whenever user clicks to start spinning the wheel:
1. First, i store the position of pointer of spinner wheel which points to where it's stop.
2. btw, i was created an entire spinner wheel using a chunk of triangle shape and then i arranged it as absolute position within parent relative circle of wheel.
3. so, before spinning the wheel every time i store all triangle positions i.e. Top Bottom, Left Right
4. after when spinner wheel will be stopped the script.js code will check first which triangle shapes are nearest to pointer position and rest of triangle will be excluded. so might be possible we will get the maximum of three triangles (cause: for that you need to check first spinner wheel design). so from that 3 triangles, our algorithm will find the those triangle that in between top-bottom our pointer size can fit in it and rest of triangle will be excluded and it will return the final triangle and from that we can display rewarded offer.  


### Spinner Wheel Spinning Move approach:

1. First, i am assign two arrays one for multiple different seconds and other for different angles to rotate the spinner wheel
2. by using this calculation: 
```javascript 
  Math.floor((Math.random() * [ length of transition second Array ]))
``` 
:point_right:	 every time we will get a different second that will be used to set the time of movement of wheel.

3. by using this calculation: 
```javascript
  Math.floor((Math.random() * [ length of angle Array ]))
``` 
:point_right:	 every time we will get a different angle that will be used in which angle we have to moved the wheel.

4. that's it. these two calculated values will be assign on spinner wheel.

**Thanks in advance! if anything you will find wrong in this repository please let me know.**
