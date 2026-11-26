# Persistent session acceptance tests

Run on Windows and Android separately using a test account; never record credentials or cookie values.

- Install v0.3.1 and open the official HTTPS page. Sign in manually.
- Close and reopen the app; check whether the website remains signed in.
- Terminate the process, reopen, and repeat after a device reboot.
- Upgrade from v0.3.0 without uninstalling, using the same package identifier and signing identity; verify session retention.
- Log out on the website; verify that reopening does not bypass logout.
- If the server expires the session, verify that normal login is requested.
- Confirm remote IPC capabilities remain empty and no custom commands exist.

Record platform, OS version, WebView version, app version and pass/fail only. These tests are not yet executed.
