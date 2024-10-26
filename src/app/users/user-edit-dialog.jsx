import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { setData } from "./page";

export const UserEditDialog = ({ open, onClose, data, setData }) => {
  const [nameValue, setNameValue] = useState("");
  const [lastnameValue, setLastNameValue] = useState("");
  const [mailValue, setMailValue] = useState("");

  const addNewUser = async () => {
    const newUser = {
      firstname: nameValue,
      lastname: lastnameValue,
      email: mailValue,
      id: idGenerator(),
      imageUrl: "http://dummyimage.com/117x116.png/cc0000/ffffff",
    };
    try {
      const resJSON = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      const res = await resJSON.json();
      console.log(res);
      setData([...data, newUser]);
      onClose(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Last - Name</Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              value={lastnameValue}
              onChange={(e) => {
                setLastNameValue(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Mail</Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              value={mailValue}
              onChange={(e) => {
                setMailValue(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={addNewUser}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
