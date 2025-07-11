# Changelog

All notable changes to the ngx-liburg library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [19.2.0] - 2025-07-11

### Breaking Changes
- Migrated from Angular Material to PrimeNG component library
- Changed component API to align with PrimeNG patterns
- Updated styling system to use @primeng/themes

### Added
- Added comprehensive CSS token system in styles.scss for consistent theming:
  - Layout tokens:
    - `--app-background-drawer-outlet`
    - `--app-background-drawer-outlet-x-button`
    - `--app-background-drawer`
  
  - Application-wide tokens:
    - `--app-text-color`: Default text color
    - `--app-text-color-dark`: Darker text color
    - `--primary-color-input`: Primary color for input focus
    - `--primary-border-color`: Default border color for inputs

  - Table specific tokens:
    - `--app-background-table-color`: Background for table header
    - `--app-background-table-hover-header-color`: Background on row hover
    - `--app-background-table-zebra-color`: Background for zebra rows
    - `--app-background-color-table-datatable`: Background for the datatable component
    - `--app-background-table-header-cell`: Background for header cells
    - `--app-background-color-table-row`: Default background for table rows
    - `--app-background-color-table-cell`: Default background for table cells
    - `--app-background-color-table-footer`: Background for table footer
    - `--app-datatable-header-cell-hover-background`: Header cell hover background
    - `--app-datatable-header-cell-hover-color`: Header cell hover text color

  - Table border tokens:
    - `--app-border-color-table-header`: Border for table header cells
    - `--app-border-color-table-row-left`: Border for left-side of rows
    - `--app-border-color-table-row-bottom`: Border for bottom of table rows
    - `--app-border-color-table-footer`: Border for table footer

  - Shadow tokens:
    - `--app-shadow-medium`: Main table shadow
    - `--app-shadow-input-focus`: Shadow for focused inputs
    - `--app-shadow-input-focus-visible`: Stronger shadow for focus-visible
    - `--app-shadow-cdk-drag-preview`: Shadow for CDK drag preview

  - CDK Drag and Drop tokens:
    - `--app-background-color-cdk-drag-preview`: Background for drag preview
    - `--cdk-drag-preview-border-color`: Border color for drag preview

  - UI Element tokens:
    - `--app-color-new-entry-icon`: Color for new entry icon

  - Paginator tokens:
    - `--app-paginator-background`: Background for paginator
    - `--app-paginator-text-color`: Text color for paginator
    - `--app-paginator-page-color`: Color for inactive page numbers
    - `--app-paginator-page-background`: Background for inactive page numbers
    - `--app-paginator-page-hover-background`: Hover background for pages
    - `--app-paginator-page-hover-color`: Hover text color for pages
    - `--app-paginator-active-page-background`: Active page background
    - `--app-paginator-active-page-color`: Active page text color
    - `--app-paginator-active-page-border-color`: Active page border
    - `--app-paginator-icon-color`: Color for paginator icons
    - `--app-paginator-icon-hover-background`: Icon hover background
    - `--app-paginator-icon-hover-color`: Icon hover color
    - `--app-paginator-dropdown-background`: Dropdown background
    - `--app-paginator-dropdown-text-color`: Dropdown text color
    - `--app-paginator-dropdown-border-color`: Dropdown border color
    - `--app-paginator-dropdown-border-radius`: Dropdown border radius
    - `--app-paginator-dropdown-panel-background`: Dropdown panel background
    - `--app-paginator-dropdown-panel-border-color`: Dropdown panel border
    - `--app-paginator-dropdown-panel-border-radius`: Dropdown panel radius
    - `--app-paginator-dropdown-item-color`: Dropdown item text color
    - `--app-paginator-dropdown-item-hover-background`: Item hover background
    - `--app-paginator-dropdown-item-hover-color`: Item hover text color
    - `--app-paginator-dropdown-item-active-background`: Active item background
    - `--app-paginator-dropdown-item-active-color`: Active item text color
```scss
/* You can add global styles to this file, and also import other style files */

  --app-background-drawer-outlet: #f8f9fa;
  --app-background-drawer-outlet-x-button: fuchsia;
  --app-background-drawer:#f8f9fa ;
  // Application-wide colors
  --app-text-color: #333; // Default text color
  --app-text-color-dark: black; // Darker text color
  --primary-color-input: #007bff; // Primary color for input focus
  --primary-border-color: #ccc; // Default border color for inputs

  // Table specific colors
  --app-background-table-color: #f8f8f8; // Background for table header (header-color class)
  --app-background-table-hover-header-color: #e0e0e0; // Background on row hover
  --app-background-table-zebra-color: #f5f5f5; // Background for zebra rows
  --app-background-color-table-datatable: white; // Background for the entire datatable component
  --app-background-table-header-cell: rgba(203, 197, 197, 0.67); // Background for individual header cells
  --app-background-color-table-row: white; // Default background for table rows
  --app-background-color-table-cell: white; // Default background for table cells
  --app-background-color-table-footer: #f8f8f8; // Background for table footer
  --app-datatable-header-cell-hover-background: #4a4a4a; /* Dark gray from your image */
  --app-datatable-header-cell-hover-color: #ffffff; /* White text from your image */

  // Table specific borders
  --app-border-color-table-header: rgba(0, 0, 0, 0.1); // Border for table header cells (example)
  --app-border-color-table-row-left: rgba(0, 0, 0, 0.15); // Border for left-side of header-border-left rows
  --app-border-color-table-row-bottom: rgba(0, 0, 0, 0.15); // Border for bottom of table rows
  --app-border-color-table-footer: rgba(0, 0, 0, 0.15); // Border for table footer

  // Shadows
  --app-shadow-medium: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px; // Main table shadow
  --app-shadow-input-focus: inset 0px 0px 3px 1px rgba(0, 0, 255, 0.2); // Shadow for focused inputs
  --app-shadow-input-focus-visible: inset 0px 0px 3px 1px rgba(0, 0, 255, 0.4); // Stronger shadow for focus-visible
  --app-shadow-cdk-drag-preview: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; // Shadow for CDK drag preview

  // CDK Drag and Drop
  --app-background-color-cdk-drag-preview: white;
  --cdk-drag-preview-border-color: #5f7651;

  // New Entry Button
  --app-color-new-entry-icon: #52796f;

  // Paginator Colors
  --app-paginator-background: #2b2b2b; /* Dark background from your image */
  --app-paginator-text-color: #f0f0f0; /* Light text color for general paginator text */

  --app-paginator-page-color: #f0f0f0; /* Color for inactive page numbers */
  --app-paginator-page-background: transparent; /* Background for inactive page numbers */
  --app-paginator-page-hover-background: #4a4a4a; /* Background on hover for inactive page numbers */
  --app-paginator-page-hover-color: #ffffff; /* Text color on hover for inactive page numbers */

  --app-paginator-active-page-background: #52796f; /* Greenish background for active page */
  --app-paginator-active-page-color: #ffffff; /* White text for active page */
  --app-paginator-active-page-border-color: #52796f; /* Border color for active page */

  --app-paginator-icon-color: #f0f0f0; /* Color for paginator arrows/icons */
  --app-paginator-icon-hover-background: #4a4a4a; /* Background on hover for icons */
  --app-paginator-icon-hover-color: #ffffff; /* Color on hover for icons */

  --app-paginator-dropdown-background: #4a4a4a; /* Background for the rows per page dropdown */
  --app-paginator-dropdown-text-color: #ffffff; /* Text color for the rows per page dropdown */
  --app-paginator-dropdown-border-color: #666; /* Border color for the rows per page dropdown */
  --app-paginator-dropdown-border-radius: 0.25rem; /* Border radius for the rows per page dropdown */

  // === MISSING VARIABLES FOR PAGINATOR DROPDOWN PANEL ===
  --app-paginator-dropdown-panel-background: #2b2b2b; /* Dark background for the opened dropdown panel */
  --app-paginator-dropdown-panel-border-color: #4a4a4a; /* Border color for the opened dropdown panel */
  --app-paginator-dropdown-panel-border-radius: 0.25rem;

  --app-paginator-dropdown-item-color: #f0f0f0; /* Default text color for dropdown items */
  --app-paginator-dropdown-item-hover-background: #4a4a4a; /* Background on hover for dropdown items */
  --app-paginator-dropdown-item-hover-color: #ffffff; /* Text color on hover for dropdown items */

  --app-paginator-dropdown-item-active-background: #52796f; /* Greenish background for active dropdown item */
  --app-paginator-dropdown-item-active-color: #ffffff; /* White text for active dropdown item */
  // =======================================================
```
### Dependencies
- Requires primeng 19.1.3 or higher
- Requires @primeng/themes 19.1.3 or higher
- Requires Angular 19.0.0 or higher
- Removed dependency on Angular Material

## [19.1.0] - 2025-07-10

### Added
- Initial release of ngx-liburg
- Core library functionality
- Angular 19 compatibility

### Dependencies
- Requires Angular 19.0.0 or higher
- Requires Angular Material 19.0.0 or higher

## How to Update
When updating the library in the future, please document changes in the following categories:
- Added (for new features)
- Changed (for changes in existing functionality)
- Deprecated (for soon-to-be removed features)
- Removed (for now removed features)
- Fixed (for any bug fixes)
- Security (in case of vulnerabilities)
