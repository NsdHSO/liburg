# ngx-liburg

## Breaking Changes

### vNEXT
- **Dependency Injection:** The TableComponent and other components now use Angular's `inject()` function for service injection instead of constructor parameters. If you extend or mock these components, update your code accordingly.
- **Private Service Fields:** Service dependencies like `TableService`, `ColumnRotateService`, and `ChangeDetectorRef` are now private readonly fields injected via `inject()`. Access them as `this._tableState`, `this._columnRotate`, and `this._changeDetectorRef`.
- **Standalone/Signal API:** If you use Angular signals or standalone components, ensure your Angular version supports these features.
- **Column Definitions:** Dynamic column logic now requires that all column names in `columnsToDispaly` have a matching column definition in the template. Mismatches will throw errors at runtime.

Please review your custom code and integrations for compatibility with these changes.

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test ngx-liburg` to execute the unit tests.
