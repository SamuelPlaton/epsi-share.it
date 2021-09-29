export class CreateWorkspaceDto {
  name: string;
}

export class InviteWorkspaceDto {
  workspaceId: string;
  userIdentifier: string;
}

export class JoinWorkspaceDto {
  id: string;
}
