'use client'

import { CircularProgress } from "@mui/material";
import { useState } from "react"

export default function BookingPage() {
    const [loading, setLoading] = useState<boolean>(true);

    return loading ? <CircularProgress color="secondary" size="50%" /> : (
        <div>
            <iframe src="https://app.usemotion.com/meet/evie-marie-kolb/booking" title="Evie Marie Kolb Booking Page" width="100%" height="840px" frameBorder="0" onLoad={() => setLoading(false)}></iframe>
        </div>
    )
}
