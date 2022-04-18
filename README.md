This repository demonstrates using the Web Bluetooth API to retrieve heart rate
from a Bluetooth device.  This code has been tested with an Amazon Halo band.
It probably works OK with other Bluetooth hear rate devices.  Please let me know
which devices you're able to get working and whether you required any code
modifications to do so.

Halo Band steps:

1. Purchase an Amazon Halo and set it up.
2. In the Halo mobile app, go to Settings -> Heart Rate Sharing and toggle on
   "Share heart rate data".

Web page steps (tested with Chrome on Android):

1. Download this repo and cd to the repo directory.
2. `python -m SimpleHTTPServer` to make index.html available at localhost:8000
   on your desktop.
3. Connect Android phone to computer, confirm `adb devices` detects phone.
4. Visit chrome://inspect/#devices.  Port forward port 8000 to phone.
5. Visit localhost:8000 on phone.
6. Hit "Find heart rate" button.  You'll get a prompt with a list of Bluetooth
   devices.  You'll have to find your device in this list.
7. After selecting device in list, expect pairing prompt on phone.  Accept
   that.
8. Heart rate should start updating on web page.
