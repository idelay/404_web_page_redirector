# 404 Web Page Redirector

This project is a browser extension designed to enhance the accessibility of web content by automatically redirecting users to archived versions of web pages when the original content is unavailable. The extension leverages both the Library of Congress archives and the Wayback Machine to retrieve archived versions of web pages that return a 404 (Page Not Found) error or are otherwise inaccessible.

## Features

- **Automatic Redirection**: Automatically redirects users to archived versions of web pages when a page is not available.
- **Multi-Archive Support**: Searches both the Library of Congress and the Wayback Machine for archived content.
- **No User Intervention Required**: Once the extension is installed, the redirection happens automatically when an unavailable page is detected.

## Installation

### Prerequisites
- A browser based on Chromium (e.g., Google Chrome, Microsoft Edge).
- Developer mode enabled in your browser's extension settings.

### Steps to Install
1. Download or clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/web-page-redirector-extension.git
   ```
2. Open your Chromium-based browser and navigate to the extensions page:
   - **Google Chrome**: Go to `chrome://extensions/`
   - **Microsoft Edge**: Go to `edge://extensions/`
3. Enable "Developer Mode" (usually found at the top right of the extensions page).
4. Click on "Load unpacked" and select the directory where you downloaded/cloned this repository.
5. The extension will now be installed and ready to use.

### Pin the Extension
For quick access and monitoring, it's recommended to pin the extension to your browser toolbar:
- Click the puzzle icon in the top-right corner of your browser and select "Pin" next to the extension name.

## Usage

Once installed, the extension will automatically monitor for web pages that return a 404 error or are otherwise unavailable. When such a page is detected, the extension will search the Library of Congress and the Wayback Machine for an archived version and redirect the user accordingly.

### Example Scenarios

- **Page Available in the Library of Congress**: If a page is found in the Library of Congress archive, the user will be redirected to that version.
- **Page Available in the Wayback Machine**: If the page is not found in the Library of Congress but is available in the Wayback Machine, the user will be redirected to the Wayback Machine version.
- **No Archived Page Found**: If no archived version is found in either source, the user remains on the original 404 page.

## License

This project is licensed under the MIT License.
