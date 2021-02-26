import {AppointmentForm,} from '@devexpress/dx-react-scheduler-material-ui';
import React, {useState, useEffect} from "react";
import Box from "@material-ui/core/Box";
import {Relative_Sheet, resourcesData} from "./Test_Data/Data";
import Type_Selector from "./Special_Seletor/Type_Selector";
import SubType_Selector from "./Special_Seletor/SubType_Selector";
import theme from "../../MyTheme/Theme";


const BasicLayout = ({onFieldChange, appointmentData, ...restProps}) => {


    const [subTypeSheet, setSubTypeSheet] = useState(Relative_Sheet[0].RelativeType)
    const [typeValue,setTypeValue] = useState(function () {
        if (appointmentData.type) {
            return appointmentData.type.id - 1
        } else {
            return 0
        }
    }());
    const [subtypeValue,setSubTypeValue] = useState(function () {
        if (appointmentData.subtype) {
            return appointmentData.subtype.id - 1
        } else {
            return 0
        }
    }());


    useEffect(() => {

        if (appointmentData.subtype) {
            setSubTypeSheet(() => {
                const result = Relative_Sheet.find((item, index) => {
                    console.log(appointmentData)
                    console.log(item)
                    return appointmentData.type.id === item.id
                })
                return result.RelativeType
            })
        } else {
            setSubTypeSheet(Relative_Sheet[0].RelativeType)
        }
    }, [])

    const onTypeTextChange = (nextValue) => {
        const Relative_Subtype_Result = Relative_Sheet.find((item, index) => {
            return item.id === nextValue + 1
        })
        setSubTypeSheet(Relative_Subtype_Result.RelativeType)
        setSubTypeValue(0)
        const typeResult = resourcesData.find((item, index) => {
            return item.id === nextValue + 1
        })
        onFieldChange({
            type: typeResult,
            subtype: Relative_Subtype_Result.RelativeType[0]
        });
    };

    const onSubTypeTextChange = (nextValue) => {
        const subtypeResult = subTypeSheet.find((item, index) => {
            return item.id = nextValue + 1
        })
        console.log(subtypeResult)
        onFieldChange({
            subtype: subtypeResult
        });
    };




    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <Box style={{
                paddingTop: 10
            }}>
                <AppointmentForm.Label
                    text="出勤类型"
                    type="title"
                />
                <Type_Selector
                    Title={null}
                    margin="normal"
                    variant="filled"
                    hiddenLabel
                    Data_Set_Function={null}
                    Data_Set_Name={'Province'}
                    Data_Group={resourcesData}
                    size={'medium'}
                    Value={typeValue}
                    setValue={setTypeValue}
                    onValueChange={onTypeTextChange}
                    hasIcon={true}
                />

                <SubType_Selector
                    Title={null}
                    margin="normal"
                    variant="filled"
                    hiddenLabel
                    Data_Group={subTypeSheet}
                    size={'medium'}
                    Value={subtypeValue}
                    setValue={setSubTypeValue}
                    onValueChange={onSubTypeTextChange}
                    hasIcon={true}
                />
            </Box>
        </AppointmentForm.BasicLayout>
    );
};

export default BasicLayout