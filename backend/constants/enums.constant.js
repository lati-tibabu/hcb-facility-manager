const UserRole = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  MEMBER: 'member',
};

const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  IN_STOCK: 'in_stock',
  OUT_OF_STOCK: 'out_of_stock',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
};
  
  module.exports = {
    UserRole,
    Status
}