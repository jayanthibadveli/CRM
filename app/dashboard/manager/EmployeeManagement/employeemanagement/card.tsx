import React from "react";

interface EmployeeCardProps {
  name: string;
  designation: string;
  employeeId: string;
  email: string;
  photoUrl: string;
}

const CleanCard: React.FC<EmployeeCardProps> = ({
  name,
  designation,
  employeeId,
  email,
  photoUrl,
}) => {
  return (
    <div className="w-80 p-5 rounded-xl shadow-md bg-white font-sans">
      <div className="flex items-center">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-pink-600">{designation}</p>
        </div>
      </div>
      <hr className="my-4" />
      <p><strong>ID:</strong> {employeeId}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
};

export default CleanCard;

