import { NextResponse } from "next/server";
import { User } from "@/types/user";

let users: User[]=[
    {id: '1', name: 'Alice'},
    {id: '2', name: 'Bob'}
];

export async function GET(){
    return NextResponse.json(users);
}

export async function POST(req:Request){
    const newUser: User =await req.json();
    users.push(newUser);
    return NextResponse.json(newUser, {status:201});
}

export async function PUT(req: Request){
    const updated: User=await req.json();
    users=users.map(u=>(u.id==updated.id ? updated: u));
    return NextResponse.json(updated)
}

export async function DELETE(req: Request){
    const { searchParams }= new URL(req.url);
    const id=searchParams.get('id');
    users=users.filter(u=>u.id!==id);
    return NextResponse.json({message: 'Deleted'})
}