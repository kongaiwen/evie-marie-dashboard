'use client'

import styles from "./page.module.scss";
import { CircularProgress } from "@mui/material";
import { useCallback, useState } from "react"

export default function BookingPage() {
    const [loading, setLoading] = useState<boolean>(true);

    const onLoad = useCallback(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <div className={styles.bookingContainer}>
            {!!loading && (
                <div className={styles.spinnerContainer}>
                    <h1>Loading Booking Page...</h1>
                    <CircularProgress color="inherit" size="8rem" />
                </div>
            )}
            <iframe className={styles.motionIframe} src="https://app.usemotion.com/meet/evie-marie-kolb/booking" title="Evie Marie Kolb Booking Page" width="100%" height="100%" frameBorder="0" onLoad={onLoad}></iframe>
        </div>
    )
}
