import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp(props) {
    const { variant, msg } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant, msg) => () => {
        // variant could be success, error, warning, info, or default
        return (enqueueSnackbar('This is a success message!', { variant }))
    };
    handleClickVariant(variant, msg);
}

export default function IntegrationNotistack(props) {
    return (
        <SnackbarProvider maxSnack={3}>
            <MyApp variant={props.variant} msg={props.msg} />
        </SnackbarProvider>
    );
}
