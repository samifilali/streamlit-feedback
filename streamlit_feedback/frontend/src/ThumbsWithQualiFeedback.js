import React, { useState, useEffect } from "react";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";

import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";

const colors = {
    colorGrey: "#c7d1d3",
    colorUp: "#022c42",
    colorDown: "#cc4b1f"
}

const TextFieldcolors = {
    colorUp: "#022c42",
    colorDown: "#cc4b1f"
}

const StyledCustomInput = styled(InputBase)(
    ({ color }) => `
    width: 70vw;
    font-family: sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 0px 12px;
    border-radius: 8px;
    color: ${color};
    border: 1px solid ${color};
    background: transparent;
    `
);

const StyledTextField = styled(TextField)(
    ({ color }) => `
        width: 60vw;
        font-family: sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        border-radius: 8px;
        color: ${color};
        border: 1px solid ${color};
        background: transparent;
        `
);

export function ThumbsWithQualiFeedback(props) {
    const [thumbScore, setThumbScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [inputText, setInputText] = useState(null);

    useEffect(() => {
        if (props.disableWithScore) {
            setSubmitted(true);
            setThumbScore(props.disableWithScore);
        }
    }, [props.disableWithScore])

    let thumbUpColor;
    let thumbHoverUpColor;
    let thumbDownColor;
    let thumbHoverDownColor;
    if (thumbScore === "👍") {
        thumbUpColor = colors["colorUp"]
        thumbHoverUpColor = colors["colorUp"]
        thumbDownColor = submitted ? "transparent" : colors["colorGrey"]
        thumbHoverDownColor = submitted ? "transparent" : colors["colorDown"]
    } else if (thumbScore === "👎") {
        thumbUpColor = submitted ? "transparent" : colors["colorGrey"]
        thumbHoverUpColor = submitted ? "transparent" : colors["colorUp"]
        thumbDownColor = colors["colorDown"]
        thumbHoverDownColor = colors["colorDown"]
    } else {
        thumbUpColor = colors["colorGrey"]
        thumbHoverUpColor = colors["colorUp"]
        thumbDownColor = colors["colorGrey"]
        thumbHoverDownColor = colors["colorDown"]
    }

    if (submitted) {
       return null
    }


    const handleThumbClick = (score) => {
        if (score === thumbScore) {
            setThumbScore(null);
        } else {
            setThumbScore(score);
        }
    };

    const handleTextInput = (text) => {
        setInputText(text.currentTarget.value);
    };

    const handleSubmission = () => {
        props.submitFeedback(thumbScore, inputText);
        setSubmitted(true);
    };

    if (props.maxTextLength != null) {
        return (
            <Box paddingY={0.5} height={140} component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }} noValidate autoComplete="off">
                <Stack direction="row" spacing={1} justifyContent={props.align}>
                    <ThumbUpOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbUpColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverUpColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👍")}
                    />
                    <ThumbDownOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbDownColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverDownColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👎")}
                    />
                    {submitted === false && thumbScore !== null && props.reviewOnPositive === true? <StyledTextField id="outlined-multiline-static-all" inputProps={{ maxLength: props.maxTextLength }} onChange={handleTextInput} multiline rows={4} placeholder={props.optionalTextLabel} aria-label="Demo input" color={thumbScore === "👍" ? TextFieldcolors["colorUp"] : TextFieldcolors["colorDown"]} /> : null}
                    {submitted === false && thumbScore === "👎" && !props.reviewOnPositive ? <StyledTextField id="outlined-multiline-static-neg" inputProps={{ maxLength: props.maxTextLength }} onChange={handleTextInput} multiline rows={4} placeholder={props.optionalTextLabel} aria-label="Demo input" color={thumbScore === "👍" ? TextFieldcolors["colorUp"] : TextFieldcolors["colorDown"]} /> : null}
                    {submitted === false && thumbScore !== null ? <StyledTextField id="outlined-multiline-static" inputProps={{ maxLength: props.maxTextLength }} onChange={handleTextInput} multiline rows={4} placeholder={props.optionalTextLabel} aria-label="Demo input" color={thumbScore === "👍" ? TextFieldcolors["colorUp"] : TextFieldcolors["colorDown"]} /> : null}
                    {submitted === false && thumbScore !== null ? <Button sx={{ color: thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"] }} variant="text" size="small" onClick={handleSubmission}>Envoyer</Button> : null}
                </Stack>
            </Box>
        )
    }
    else {
        return (
            <Box paddingY={0.5}>
                <Stack direction="row" spacing={1} justifyContent={props.align}>
                    <ThumbUpOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbUpColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverUpColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👍")}
                    />
                    <ThumbDownOffAltIcon
                        sx={{
                            fontSize: 28,
                            color: thumbDownColor,
                            '&:hover': {
                                cursor: submitted ? null : "pointer",
                                color: thumbHoverDownColor,
                            },
                        }}
                        onClick={() => submitted ? {} : handleThumbClick("👎")}
                    />
                    {submitted === false && thumbScore !== null && props.reviewOnPositive === true ? <StyledCustomInput onChange={handleTextInput} aria-label="Demo input" placeholder={props.optionalTextLabel} color={thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"]} /> : null}
                    {submitted === false && thumbScore === "👎" && !props.reviewOnPositive ? <StyledCustomInput onChange={handleTextInput} aria-label="Demo input" placeholder={props.optionalTextLabel} color={thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"]} /> : null}
                    {/* {submitted === false && thumbScore !== null ? <StyledCustomInput onChange={handleTextInput} aria-label="Demo input" placeholder={props.optionalTextLabel} color={thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"]} /> : null} */}
                    {submitted === false && thumbScore !== null ? <Button sx={{ color: thumbScore === "👍" ? colors["colorUp"] : colors["colorDown"] }} variant="text" size="small" onClick={handleSubmission}>Envoyer</Button> : null}
                </Stack>
            </Box>
        )
    }
}
