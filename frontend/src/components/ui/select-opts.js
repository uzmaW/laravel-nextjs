import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";



export default function SelectOpts({values, defaultValue, title}) {
    return (
        <Select defaultValue={defaultValue}>
            <SelectTrigger className="w-[100px] px-2 ">
                <SelectValue placeholder="Set priority"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{title}</SelectLabel>
                    {values.map((el, index) => (
                        <SelectItem key={index} value={el}>{el}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}