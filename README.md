# authly-editid
A nextjs app with a unique login flow

# Todo App with rhythm based auth
This app is just a simple todo list app, and it has a rhythm based auth system, where you choose your username, and then tap a rhythm that you want as your password.

# What it looks like
![Example signup form](https://image.dfarkas.uk/image/b7e9015d-b16b-42c9-9ec0-cc21210fe865.png)

# How it works
When you tap on the box, it records a tap, and based on the time since the last tap, it also records no gap, a gap, or a long gap.

At the time of writing, the delays are the following:
|Delay|Gap|
|---|---|
|delay < 250ms|No gap|
|500ms > delay >= 250ms|Gap|
|delay > 500ms|Long gap|

These values might be changed, as I need to find the best values for different devices, but at the time of writing these are correct.

# Example of todo list
![Example of todo list](https://image.dfarkas.uk/image/22a8f6e8-1148-481a-ba51-7b18b596555a.png)

# Features
It's a relatively simple todo list, as I was mainly focused on the auth system, so the features are just being able to click anywhere on the task to check it off, one click delete, fuzzy searching for tasks.
