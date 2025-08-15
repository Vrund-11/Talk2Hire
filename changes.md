# Code Changes Summary

This document summarizes the exact line changes made to resolve the `TypeError`.

---

### 1. `talk2hire/app/auth/provider.jsx`

**Change:** Added the `useUser` hook to export the user context.

**Lines Added:**

```javascript
import React, { useContext, useEffect, useState } from 'react'

export const useUser = () => {
    return useContext(UserDetailsContext);
}
```

**Previous Snippet:**

```javascript
import React, { useEffect, useState } from 'react'
```

---

### 2. `talk2hire/app/(main)/dashboard/_components/WelcomeMessage.jsx`

**Change:** Corrected the import path for the `useUser` hook.

**Line Changed (Line 3):**

**Previous Line:**
```javascript
import { useUser } from '../../provider'
```

**Corrected Line:**
```javascript
import { useUser } from '@/app/auth/provider'
