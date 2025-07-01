# Progressed Moon Degree Precision Fix

## Problem Description
The Progressed Moon's degree was being displayed as "13° Capricornio" in the frontend instead of the accurate "5.3° Capricornio" calculated by the backend. The issue was traced to the API response where the `grado` field in the `luna_progresada` object was being truncated to an integer.

## Root Cause
In `../astro-calendar-personal-fastapi/src/calculators/astronomical_transits_calculator_v4.py`, line ~1000, the `moon_degree` was being calculated as:

```python
moon_degree = int(progressed_moon_pos % 30)
```

This truncated the precise decimal value (e.g., 5.3) to an integer (e.g., 5), but due to some rounding or calculation differences, it was showing as 13 instead of the expected ~5.3.

## Solution Applied
Changed the calculation to preserve one decimal place of precision:

```python
# OLD:
moon_degree = int(progressed_moon_pos % 30)

# NEW:
moon_degree = round(progressed_moon_pos % 30, 1)
```

## Files Modified
- `../astro-calendar-personal-fastapi/src/calculators/astronomical_transits_calculator_v4.py` (line ~1000)

## Expected Result
After restarting the backend service, the API response should now show the accurate degree value (e.g., "5.3") in the `grado` field of the `luna_progresada` object, and the frontend should display "5.3° Capricornio" instead of "13° Capricornio".

## Verification Steps
1. Restart the backend service: `cd ../astro-calendar-personal-fastapi && python app.py`
2. Test the API endpoint: `http://localhost:8004/calculate-personal-calendar-dynamic`
3. Check the `house_transits` -> `luna_progresada` -> `grado` field in the response
4. Verify the frontend displays the correct degree value

## Rollback Instructions
If needed, revert the change by replacing:
```python
moon_degree = round(progressed_moon_pos % 30, 1)
```
back to:
```python
moon_degree = int(progressed_moon_pos % 30)
```

## Date
June 30, 2025
