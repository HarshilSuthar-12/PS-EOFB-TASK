param(
    [Parameter(Mandatory=$true)]
    [string]$UserId,
    [Parameter(Mandatory=$true)]
    [string]$ManagerEmail
)

try {
    # Convert user mailbox to shared mailbox
    Set-Mailbox -Identity $UserId -Type Shared

    # Hide user from global address list
    Set-Mailbox -Identity $UserId -HiddenFromAddressListsEnabled $true

    # Transfer 'Out of Office' settings to manager (assuming manager's mailbox is identified by email)
    # Note: These are placeholder values for 'Out of Office' settings. You'll need to adjust these based on actual requirements or API capabilities.
    $AutoReplyState = "Scheduled"
    $StartTime = (Get-Date).AddDays(-1)
    $EndTime = (Get-Date).AddDays(7)
    $InternalMessage = "I am out of the office. For any urgent issues, please contact my manager."
    $ExternalMessage = "I am out of the office. For any urgent issues, please contact my manager at $ManagerEmail."

    Set-MailboxAutoReplyConfiguration -Identity $UserId `
        -AutoReplyState $AutoReplyState `
        -StartTime $StartTime `
        -EndTime $EndTime `
        -InternalMessage $InternalMessage `
        -ExternalMessage $ExternalMessage

    # Delegate email rights to the user's manager
    Add-MailboxPermission -Identity $UserId -User $ManagerEmail -AccessRights FullAccess -InheritanceType All
    Add-RecipientPermission -Identity $UserId -Trustee $ManagerEmail -AccessRights SendAs

    Write-Output "Mailbox modification for user $UserId completed. Manager $ManagerEmail has been granted access."
} catch {
    Write-Error "An error occurred while modifying the mailbox for user $UserId. Error: $_"
}