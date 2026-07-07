---
trigger: always_on
---

# React Native E-Commerce UI Development Rules

## Localization

1. Always use translation keys from localization files (e.g., `localizations/en/translation.json`).
2. Never use hardcoded strings directly in UI components.
3. Before adding a new translation key, search existing localization files for the same or similar text.
4. Reuse existing translation keys whenever possible.
5. If a new translation key is required, add it to **all supported language files** using a clear, consistent, and meaningful key name.

---

## Theme & Styling

6. Always use values from `theme.utils` (colors, spacing, typography, border radius, shadows, etc.). Never hardcode design values.
7. Do not use inline styles unless they are dynamic and cannot be moved into a StyleSheet. Create reusable styles whenever possible.
8. Use responsive sizing utilities for spacing, fonts, width, and height. Avoid fixed pixel values unless absolutely necessary.
9. Maintain consistent spacing throughout the app by using predefined spacing tokens from the theme.

---

## Components

11. Reuse existing shared components before creating new ones.
12. If the same UI is used in two or more places, convert it into a reusable component.
13. Keep components focused on a single responsibility.
14. Separate UI components from business logic and API calls.
15. Do not duplicate component code. Refactor common logic into shared components or custom hooks.

---

## Code Quality

16. Write clean, readable, and maintainable code.
17. Follow the project's folder structure and naming conventions.
18. Remove unused imports, variables, functions, and commented-out code before committing.
19. Use meaningful variable, function, and component names.
20. Avoid deeply nested conditional rendering. Prefer helper functions or smaller reusable components.

---

## E-Commerce Specific

21. Product cards, category cards, banners, buttons, loaders, empty states, price views, rating views, and quantity selectors must be reusable components.
22. All currency formatting must use the shared currency utility. Never concatenate currency symbols manually.
23. Product prices, discounts, stock status, and offers should always come from API data or shared utilities, not hardcoded values.
24. Images should use the project's shared image component with placeholder and error handling.
25. Cart, Wishlist, Checkout, Orders, and Profile screens must follow the same design system and spacing guidelines.

---

## Performance

26. Use `FlatList` or `SectionList` for rendering lists. Avoid using `ScrollView` for large datasets.
27. Memoize expensive components using `React.memo`, `useMemo`, and `useCallback` where appropriate.
28. Avoid unnecessary re-renders by keeping state localized and minimizing prop changes.
29. Lazy-load heavy screens or components whenever possible.
30. Optimize images and avoid loading unnecessarily large assets.

---

## Accessibility

31. Every touchable component should have an accessible touch target.
32. Add accessibility labels for interactive elements where appropriate.
33. Ensure text has sufficient color contrast against the background.
34. Support dynamic font sizes where possible.

---

## Testing & Validation

35. Before submitting code, verify:

    - No hardcoded UI strings exist.
    - All text uses localization.
    - Theme utilities are used for colors, spacing, and typography.
    - Existing reusable components are reused.
    - No duplicate UI implementation exists.
    - Responsive layout works on small and large devices.
    - Empty, loading, and error states are implemented.
    - API failures are handled gracefully.
    - No TypeScript or ESLint errors remain.
    - No unused imports or dead code remain.

---

## Pull Request Checklist

- ✅ Uses localization for all UI text.
- ✅ Uses `theme.utils` for styling.
- ✅ Reuses existing shared components.
- ✅ Responsive on Android and iOS.
- ✅ No hardcoded colors, fonts, or spacing.
- ✅ Handles loading, empty, and error states.
- ✅ Follows project naming conventions.
- ✅ Passes linting and type checks.
- ✅ No duplicated code.
- ✅ Code is production-ready and maintainable.
